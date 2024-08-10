import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import StandardScaler


class dataset_preparation:
    def __init__(self, train_df, dataset):
        self.train_df = train_df
        self.dataset = dataset

    def change_numeric_features(self):
        def change_curr_location():
            self.dataset["curr_location_x"] = self.dataset["current_location"].apply(lambda x: (x.split(","))[0][2:-1]).astype(
                float)
            self.dataset["curr_location_y"] = self.dataset["current_location"].apply(lambda x: (x.split(","))[1][2:-2]).astype(
                float)
            self.train_df["curr_location_x"] = self.train_df["current_location"].apply(lambda x: (x.split(","))[0][2:-1]).astype(
                float)
            self.train_df["curr_location_y"] = self.train_df["current_location"].apply(lambda x: (x.split(","))[1][2:-2]).astype(
                float)
            self.dataset.drop('current_location', axis=1, inplace=True)


        def change_blood_type():
            self.dataset['A'] = self.dataset["blood_type"].isin(["A+", "A-"]).apply(lambda x: int(x))
            self.dataset['A'] = self.dataset["blood_type"].isin(["A+", "A-"]).apply(lambda x: int(x))
            self.dataset['B'] = self.dataset["blood_type"].isin(["B+", "B-", "AB+", "AB-"]).apply(lambda x: int(x))
            self.dataset['O'] = self.dataset["blood_type"].isin(["O+", "O-"]).apply(lambda x: int(x))
            self.dataset.drop('blood_type', axis=1, inplace=True)

        change_blood_type()
        change_curr_location()

    def change_categorical_features(self):
        def change_symptoms():
            self.dataset["cough"] = self.dataset["symptoms"].str.contains("cough").fillna(value=False).apply(lambda x: int(x))
            self.dataset["low_appetite"] = self.dataset["symptoms"].str.contains("low_appetite").fillna(value=False).apply(
                lambda x: int(x))
            self.dataset["shortness_of_breath"] = self.dataset["symptoms"].str.contains("shortness_of_breath").fillna(
                value=False).apply(lambda x: int(x))
            self.dataset["sore_throat"] = self.dataset["symptoms"].str.contains("sore_throat").fillna(value=False).apply(
                lambda x: int(x))
            self.dataset["fever"] = self.dataset["symptoms"].str.contains("fever").fillna(value=False).apply(lambda x: int(x))
            self.dataset.drop('symptoms', axis=1, inplace=True)

        change_symptoms()
    # dropping unhelpful features:
    def drop_features(self):
        self.dataset.drop(['patient_id', 'pcr_date', 'sex'], axis=1, inplace=True)

    def normalization(self):
        def stdNormal(feature):
            dataset = self.dataset[[feature]]
            scaler = StandardScaler()
            scaler.fit(self.train_df[[feature]])  
            normalaized_feature = scaler.transform(dataset)
            self.dataset[feature] = normalaized_feature

        def minMaxNormal(feature):
            dataset = self.dataset[[feature]]
            scaler = MinMaxScaler((-1, 1))
            scaler.fit(self.train_df[[feature]])  
            normalaized_feature = scaler.transform(dataset)
            self.dataset[feature] = normalaized_feature

        min_max_features = ['age', 'PCR_03', 'PCR_04', 'PCR_05', 'happiness_score', 'conversations_per_day',
                            'sport_activity', 'PCR_01', 'PCR_02', 'PCR_07', 'PCR_09', 'current_location_y',
                            'num_of_siblings']
        std_features = ['weight', 'sugar_levels', 'household_income', 'PCR_06', 'PCR_08', 'PCR_10',
                        'current_location_x']

        for feature in std_features:
            stdNormal(feature)

        for feature in min_max_features:
            minMaxNormal(feature)


def prepare_data(train_df, new_data):
    new_data_return = dataset_preparation(train_df.copy(), new_data.copy())
    new_data_return.change_categorical_features()
    new_data_return.change_numeric_features()
    new_data_return.drop_features()
    new_data_return.normalization()

    return new_data_return.dataset
