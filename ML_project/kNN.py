from sklearn.base import BaseEstimator, ClassifierMixin
import numpy as np
import scipy


class kNN(BaseEstimator, ClassifierMixin):
    def __init__(self, n_neighbors: int = 3):
        self.n_neighbors = n_neighbors
        self.y_train = None
        self.X_train = None


    def fit(self, X, y):
        self.y_train = np.array(y)
        self.X_train = np.array(X)
        return

    def predict(self, X):
        distances = scipy.spatial.distance.cdist(X, self.X_train, metric='euclidean')

        idx = np.argpartition(distances, self.n_neighbors, axis=-1)[:, :self.n_neighbors]
        predictions = np.where(self.y_train[idx].mean(axis=1) >= 0, 1, -1)
        return predictions


