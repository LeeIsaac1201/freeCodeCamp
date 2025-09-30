# Import the NumPy library for numerical operations
import numpy as np

# Define calculate() to validate input, reshape data, and compute statistics
def calculate(input_list):
    # Ensure the input list contains exactly nine numbers
    if len(input_list) != 9:
        raise ValueError("List must contain nine numbers.")

    # Convert the flat list into a 3×3 NumPy array
    arr = np.array(input_list).reshape(3, 3)

    # Compute the mean, variance, standard deviation, maximum, minimum, and sum values
    calculations = {
        'mean': [
            list(np.mean(arr, axis=0)),
            list(np.mean(arr, axis=1)),
            np.mean(arr).item()
        ],
        'variance': [
            list(np.var(arr, axis=0)),
            list(np.var(arr, axis=1)),
            np.var(arr).item()
        ],
        'standard deviation': [
            list(np.std(arr, axis=0)),
            list(np.std(arr, axis=1)),
            np.std(arr).item()
        ],
        'max': [
            list(np.max(arr, axis=0)),
            list(np.max(arr, axis=1)),
            np.max(arr).item()
        ],
        'min': [
            list(np.min(arr, axis=0)),
            list(np.min(arr, axis=1)),
            np.min(arr).item()
        ],
        'sum': [
            list(np.sum(arr, axis=0)),
            list(np.sum(arr, axis=1)),
            np.sum(arr).item()
        ]
    }

    # Return the dictionary of calculated statistics
    return calculations