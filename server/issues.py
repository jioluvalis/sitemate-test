from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample hardcoded issues
issues = [
    {"id": 1, "title": "Issue 1", "description": "Description 1"},
    {"id": 2, "title": "Issue 2", "description": "Description 2"}
]

# Counter for generating unique IDs
issue_id_counter = len(issues) + 1

# Create
@app.route('/issues', methods=['POST'])
def create_issue():
    global issue_id_counter

    new_issue = request.json
    new_issue["id"] = issue_id_counter
    issues.append(new_issue)

    print("Created Issue:", new_issue)
    
    # Increment the counter for the next issue
    issue_id_counter += 1

    return jsonify(new_issue)

# Read
@app.route('/issues', methods=['GET'])
def get_issues():
    return jsonify(issues)

# Update
@app.route('/issues', methods=['PUT'])
def update_issue():
    updated_issue = request.json
    issue_id = int(updated_issue.get('id'))
    existing_issue = next((issue for issue in issues if issue['id'] == issue_id), None)
    
    if existing_issue:
        existing_issue.update(updated_issue)
        print("Updated Issue:", existing_issue)
        return jsonify(existing_issue)
    else:
        return jsonify({"error": "Issue not found"}), 404

# Delete
@app.route('/issues', methods=['DELETE'])
def delete_issue():
    issue_id = int(request.json.get('id'))
    deleted_issue = next((issue for issue in issues if issue['id'] == issue_id), None)
    
    if deleted_issue:
        issues.remove(deleted_issue)
        print("Deleted Issue:", deleted_issue)
        return jsonify(deleted_issue)
    else:
        return jsonify({"error": "Issue not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
