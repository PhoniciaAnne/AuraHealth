import joblib
from flask import Flask, request, jsonify
import os

# Define paths to the model files
MODEL_PATH = os.path.join('../models_files/optimized_health_risk_model.pkl')
ENCODER_PATH = os.path.join('../models_files/label_encoders.pkl')

# Load the model and encoders from `models_files`
model = joblib.load(MODEL_PATH)
label_encoders = joblib.load(ENCODER_PATH)

app = Flask(__name__)

# Preprocessing function
def preprocess_input(data):
    return [
        label_encoders['StateAbbr'].transform([data['StateAbbr']])[0],
        label_encoders['Category'].transform([data['Category']])[0],
        label_encoders['Measure'].transform([data['Measure']])[0],
        data['TotalPopulation'],
        data['Low_Confidence_Limit'],
        data['High_Confidence_Limit']
    ]

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        processed_data = preprocess_input(data)
        prediction = model.predict([processed_data])[0]
        return jsonify({'predicted_health_risk': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001)
