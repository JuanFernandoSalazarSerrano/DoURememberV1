import re

raw = """Here's the JSON response based on the evaluation:

```json
{
  "aiResponse": "Well done on catching the number 9! It's like you swear you'll never give up, but perhaps next time you can bring along your friends 7 and 8 as well. Keep 'em coming, ace!",
  "rememberScore": 7,
  "presentEntities": '["9"]',
  "missingEntities": '["7", "8"]',
  "incorrectDetails": '[]',
  "confabulatedDetails": '[]',
  "presence": 0.5,
  "accuracy": 1.0,
  "omission": 0.5,
  "commission": 0.0,
  "explanation": "You accurately recalled the ground truth but missed some key entities and facts.",
  "usergroundTruthResponse": { "id": 4 }
}
```
"""

raw2 = re.search(r"/```json([\s\S]*?)```/g", raw, re.MULTILINE)

if raw2:
    clean_json = raw2.group(1)  # 🟢 Extracted pure JSON
else:
    clean_json = raw  # In case the model didn't wrap JSON in backticks

print(raw2, 'HOLA')

match = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", clean_json, re.MULTILINE)

if match:
    clean_json = match.group(1)  # 🟢 Extracted pure JSON
    print(clean_json)
else:
    print(clean_json)



