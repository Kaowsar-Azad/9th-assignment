import json

log_path = r"C:\Users\user\.gemini\antigravity\brain\ddd9ece8-b29c-4fff-ac01-31e7529e316b\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("source") == "USER_EXPLICIT" and "Ensure the Following Things to Get 100% Mark" in data.get("content", ""):
                print("--- FOUND USER REQUEST ---")
                print(data["content"])
                print("--------------------------")
        except Exception as e:
            pass
