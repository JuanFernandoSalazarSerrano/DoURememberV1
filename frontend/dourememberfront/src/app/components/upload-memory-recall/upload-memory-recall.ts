import { MemoryRecallService } from './../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { PatientsService } from './../../services/patientsService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as UC from '@uploadcare/file-uploader';
import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css"
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

UC.defineComponents(UC);

@Component({
  selector: 'upload-memory-recall',
  imports: [FormsModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './upload-memory-recall.html'

})

export class UploadMemoryRecall {


    userId!: number | null;

    memoryRecall = new MemoryRecallModel();

    memoryRecallImageUrl = signal('https://33qwzktq6w.ucarecd.net/baf3add8-8795-4032-979a-de019597e1eb/')

  constructor(private readonly memoryRecallService: MemoryRecallService, private readonly PatientsService: PatientsService, private router: Router){
    this.userId = this.PatientsService.getUserId()
    this.memoryRecall.user.id = this.userId
}

  ngAfterViewInit(): void {
    this.initializeUploaderAPI();
  }

  /**
   * Initializes the Uploadcare uploader API and sets up event listeners
   */
  private initializeUploaderAPI(): void {
    const uploaderCtx = document.querySelector('#uploaderctx') as any;

    if (!uploaderCtx) {
      console.warn('❌ Uploadcare context provider not found');
      return;
    }

    try {
      // Get reference to the API instance
      const api = uploaderCtx.getAPI();

      if (!api) {
        console.warn('⚠️ API instance not available yet');
        return;
      }

      // Use the API methods to get output collection state
      const collectionState = api.getOutputCollectionState();
      console.log('✅ Uploadcare API initialized successfully');
      console.log('📦 Output Collection State:', collectionState);

      // Listen for file-upload-success events using DOM event listener
      uploaderCtx.addEventListener('file-upload-success', (event: any) => {
        const entry = event.detail;
        this.handleUploadComplete(entry);
      });

      // Listen for collection changes
      uploaderCtx.addEventListener('collection-update', (event: any) => {
        console.log('📝 Collection updated');
        try {
          const currentApi = uploaderCtx.getAPI();
          if (currentApi) {
            const currentState = currentApi.getOutputCollectionState();
            console.log('Current collection state:', currentState);
          }
        } catch (err) {
          console.error('Error getting collection state on update:', err);
        }
      });

    } catch (error) {
      console.error('❌ Error initializing Uploadcare API:', error);
    }
  }

  /**
   * Handles the upload completion event
   * @param entry - The uploaded file entry
   */
  private handleUploadComplete(entry: any): void {
    const cdnUrl = entry.fileInfo?.cdnUrl;

    if (cdnUrl) {
      console.log('✅ File uploaded successfully');
      console.log('📸 CDN URL:', cdnUrl);
      console.log('📋 File Details:', {
        uuid: entry.uuid,
        filename: entry.fileInfo?.filename,
        size: entry.fileInfo?.size,
        mimeType: entry.fileInfo?.mimeType,
        cdnUrl: cdnUrl
      });
      this.memoryRecallImageUrl.set(cdnUrl)

      // Store the uploaded image URL in your memory recall model
      // You can use this URL for further processing
    } else {
      console.warn('⚠️ File uploaded but CDN URL not available');
    }
  }

  async onSubmit(): Promise<void> {
    // Get the uploader context and API
    const uploaderCtx = document.querySelector('#uploaderctx') as any;

    if (uploaderCtx) {
      try {
        const api = uploaderCtx.getAPI();
        if (api) {
          // Get current collection state before submitting
          const collectionState = api.getOutputCollectionState();
          console.log('📦 Final Collection State before submit:', collectionState);

          // You can access uploaded files from the collection state
          if (collectionState && collectionState.length > 0) {
            const uploadedFile = collectionState[0];
            console.log('🖼️ Uploaded file ready:', uploadedFile);
            // You can use uploadedFile.cdnUrl for your form submission
          }
        }
      } catch (error) {
        console.error('Error accessing uploader API:', error);
      }
    }

    this.memoryRecall.memoryrecallurl = this.memoryRecallImageUrl();

    const {memoryrecallid, ...memoryRecallwithoutId} = this.memoryRecall

    this.memoryRecallService.createMemoryRecall(memoryRecallwithoutId as MemoryRecallModel)
      .subscribe({
        next: (saved) => console.log('Saved:', saved),
        error: (err) => console.error(err)
      });

    console.log(this.memoryRecall, '4389');

    await new Promise(resolve => setTimeout(resolve, 100));
    this.router.navigate([`/tests/memoryrecall/${this.userId}`]);
  }
}
