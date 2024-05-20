from transformers import pipeline
import sys
import json

""" def classify_text(text):
    try:
        classifier = pipeline('zero-shot-classification')
        labels = ['healthcare', 'education', 'rural development', 'economy']
        results = classifier(text, candidate_labels=labels)
        return results
    except Exception as e:
        print(f"Error classifying text: {e}")
        return None """

def classify_text(file_path):
    try:
        # Read the file content
        with open(file_path, 'r') as file:
            text = file.read()

        classifier = pipeline('zero-shot-classification')
        labels = ['healthcare', 'education', 'rural development', 'economy']
        results = classifier(text, candidate_labels=labels)
        return results
    except Exception as e:
        print(f"Error classifying text: {e}")
        return None

if __name__ == "__main__":
    text = sys.argv[1]
    results = classify_text(text)
    if results is not None:
        print(json.dumps(results))
