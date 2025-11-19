from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

with open('jokers.json', 'r') as f:
    jokers_data = json.load(f)["Jokers"]

# Convert to list and include the name as a field, sorted by Nr
jokers_list = sorted(
    [{"Name": name, **details} for name, details in jokers_data.items()],
    key=lambda x: x['Nr']
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/jokers')
def get_jokers():
    return jsonify(jokers_list)

if __name__ == '__main__':
    app.run(debug=True)
