import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error
import lightgbm as lgb
import joblib

# Define path to the dataset
DATASET_PATH = 'health_data.csv'

# Load and preprocess the dataset
def load_and_preprocess_data(filepath):
    data = pd.read_csv(filepath)

    # Handle missing values if any
    data = data.dropna(subset=['Data_Value', 'StateAbbr', 'Category', 'Measure', 
                               'TotalPopulation', 'Low_Confidence_Limit', 'High_Confidence_Limit'])

    # Define all possible categories for each column
    all_measures = ["Diabetes", "Stroke", "Arthritis", "Cancer", "Hearing Disability"]  # Add all expected values
    
    # Encode categorical columns
    label_encoders = {}
    for col, categories in [('StateAbbr', data['StateAbbr'].unique()), 
                            ('Category', data['Category'].unique()), 
                            ('Measure', all_measures)]:
        le = LabelEncoder()
        le.fit(categories)  # Fit with all possible categories
        data[col] = le.transform(data[col].astype(str))
        label_encoders[col] = le

    # Define features (X) and target (y)
    X = data[['StateAbbr', 'Category', 'Measure', 'TotalPopulation', 'Low_Confidence_Limit', 'High_Confidence_Limit']]
    y = data['Data_Value']

    return X, y, label_encoders

-


# Train the LightGBM model
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Define LightGBM training parameters
    params = {
        'objective': 'regression',
        'metric': 'rmse',
        'boosting_type': 'gbdt',
        'num_leaves': 31,
        'learning_rate': 0.1,
        'feature_fraction': 0.8
    }

    lgb_train = lgb.Dataset(X_train, y_train)
    model = lgb.train(params, lgb_train, num_boost_round=100)

    # Evaluate model performance
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    print(f"Model Test RMSE: {rmse:.2f}")

    return model

# Function to save model and encoders
def save_model_and_encoders(model, label_encoders):
    # Ensure the `models_files` directory exists in the project root
    os.makedirs('../models_files', exist_ok=True)
    
    # Save the trained model and label encoders
    joblib.dump(model, '../models_files/optimized_health_risk_model.pkl')
    joblib.dump(label_encoders, '../models_files/label_encoders.pkl')
    print("Model and encoders saved successfully in '../models_files' directory.")

# Main training process
if __name__ == "__main__":
    X, y, label_encoders = load_and_preprocess_data(DATASET_PATH)
    model = train_model(X, y)
    save_model_and_encoders(model, label_encoders)
