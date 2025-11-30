# Machine Learning with Python Projects

This repository contains projects completed for the [**Machine Learning with Python** certification from freeCodeCamp](https://www.freecodecamp.org/learn/machine-learning-with-python/).

View my certification here:  
[https://www.freecodecamp.org/certification/leeminghuiisaac/machine-learning-with-python-v7](https://www.freecodecamp.org/certification/leeminghuiisaac/machine-learning-with-python-v7)

---

## Projects

### 1. Rock Paper Scissors
- **Description:**  This project implements an autonomous Rock–Paper–Scissors player written in Python. The program provides a `player` function that is repeatedly called by a provided game engine; the function maintains state between rounds, analyses the opponent's history, and chooses moves to consistently outplay built-in opponent bots. The project is designed as a challenge: the `player` must achieve a win rate of **at least 60%** against each of four supplied bots over long matches by using adaptive strategies (frequency analysis, pattern detection, and fallbacks).
- **Objective:**  Implement and refine the `player(prev_play, opponent_history = [])` function so that it reliably defeats the four opponent bots with a ≥ 60% win rate per match. The solution should preserve state across calls within a single match, detect and exploit opponent tendencies, provide robust fallback behaviour when no clear pattern emerges, and remain compatible with the test harness that measures win rates over many games.
- **Features:**  
    - **Stateful player implementation**
        - Persists opponent and self move history between consecutive calls so the strategy can use long-term and short-term patterns.
        - Optionally supports state via module-level variables or a default mutable argument pattern to survive repeated invocations during a match.
    - **Frequency-based prediction**
        - Counts occurrences of the opponent's moves and uses most-likely-move prediction to choose the counter move.
        - Weights recent moves higher if desired (sliding-window or recency bias options can be implemented).
    - **Pattern/n-gram detection**
        - Searches for repeating subsequences or recent-play patterns in the opponent's history to predict the next move.
        - Can use simple suffix-matching (look for the last N-move sequence and see what followed it previously) or transition matrices to predict likely next plays.
    - **Hybrid strategy engine**
        - Combines multiple heuristics (frequency, pattern detection, and deterministic rotations) and selects among them by confidence (e.g., switch to pattern-prediction when a strong match is found, otherwise use frequency).
        - Includes tie-breaking and randomised choices to avoid being exploited when predictions are weak.
    - **Ideal-response mapping**
        - Maintains a clean mapping of each move to its counter (e.g., rock → paper), enabling simple translation from predicted opponent move to the chosen response.
    - **Robust fallback behaviours**
        - Implements rotation or probabilistic fallback (rock/paper/scissors cycle or random selection) when prediction confidence is low.
        - Prevents degenerate repetitive play that strong bots could exploit.
    - **Move-history utilities**
        - Helper routines for updating history, computing counters (e.g., `collections.Counter` usage), extracting recent windows, and computing confidence scores for predictions.
    - **Evaluation-friendly outputs**
        - Strategy returns moves as single-character strings ("R", "P", "S") exactly as expected by the game engine.
        - The `player` is written so its win rate can be measured deterministically in automated matches (suitable for unit tests that assert ≥ 60% win rate over many games).
    - **Adaptability and extensibility**
        - The code structure is modular, so new heuristics (Markov chains, weighted ensemble, machine-learned predictors) can be plugged in without changing the game engine interface.
        - Easy to adjust hyperparameters (window sizes, weighting factors, randomness level) to iterate on performance against different opponent types.
- **Development hints/example usage:**
    - The `player` function receives an empty string on its first call of a match and should update internal history each time it is called.
    - Combine frequency and pattern strategies and choose whichever prediction has higher confidence; use fallback rotation/random when neither is strong.
- **Example match output:**
    ```
    Final results: {'p1': 994, 'p2': 2, 'tie': 4}
    Player 1 win rate: 99.79919678714859%
    Final results: {'p1': 404, 'p2': 334, 'tie': 262}
    Player 1 win rate: 54.74254742547425%
    Final results: {'p1': 352, 'p2': 300, 'tie': 348}
    Player 1 win rate: 53.987730061349694%
    Final results: {'p1': 902, 'p2': 64, 'tie': 34}
    Player 1 win rate: 93.37474120082815%
    ```

### 2. Cat and Dog Image Classifier
- **Description:**  This project builds a convolutional neural network in Python using TensorFlow 2.x and Keras to classify images of cats and dogs. The notebook-based implementation (designed for Google Colaboratory) downloads a labelled dataset, constructs data pipelines, applies data augmentation, defines and trains a Convolutional Neural Network (CNN), and runs inference on an unlabeled test set. The goal is to produce a model that correctly classifies unseen images with at least **63%** accuracy (with extra credit for reaching 70%+).
- **Objective:**  Implement the data preprocessing, augmentation, model architecture, and training loop so that the trained model achieves ≥ 63% classification accuracy on the provided test set. The solution must:
  - Load images from the three dataset directories (train/validation/test) with correct resizing and normalisation.
  - Use `ImageDataGenerator` for preprocessing and apply online augmentation to the training data.
  - Define, compile, and train a Keras `Sequential` CNN that outputs a single probability (sigmoid) for dog vs cat.
  - Produce per-image probabilities for the test set in the original file order (i.e., `shuffle=False`), convert probabilities to binary predictions, and compute the final pass/fail score against the provided answers.
- **Features:**  
    - **Data loading & normalisation**
        - Uses `ImageDataGenerator(rescale=1/255)` to convert raw pixel values from `[0,255]` to `[0,1]` for stable training.
        - `flow_from_directory` is used for `train` and `validation` with `class_mode='binary'` so labels are 0/1.
        - `flow_from_directory(..., shuffle=False, class_mode=None)` is used for the `test` directory so predictions remain in the expected order.
    - **Data augmentation**
        - Training generator supports random transforms such as `rotation_range`, `width_shift_range`, `height_shift_range`, `shear_range`, `zoom_range`, `horizontal_flip`, and `fill_mode='nearest'` to expand the effective dataset and reduce overfitting.
        - Augmented examples can be previewed using the plotting helper to verify transformations visually.
    - **Model architecture**
        - Convolutional base using stacked `Conv2D` layers followed by `MaxPooling2D` layers to learn spatial hierarchies.
        - Final `Flatten` layer feeding into one or more `Dense` layers (e.g., a 512-unit fully connected layer) and a single-unit output with `sigmoid` activation for binary classification.
        - Option to add `Dropout` layers for better generalisation.
    - **Compilation & optimisation**
        - Compiles with `Adaptive Moment Estimation (Adam)` optimiser (configurable learning rate), `binary_crossentropy` loss and `metrics=['accuracy']` to track performance.
        - Hyperparameters (learning rate, batch size, epochs) are exposed in code for easy tuning.
    - **Training loop**
        - Uses `model.fit(...)` with `steps_per_epoch = ceil(total_train / batch_size)` and `validation_steps = ceil(total_val / batch_size)` for robust epoch sizing.
        - Training history is captured for plotting training/validation accuracy and loss curves.
    - **Evaluation & test inference**
        - Per-image inference on test images using `model.predict(...)` on single-image batches to obtain probability scores for “dog”.
        - Converts probabilities to binary labels using rounding (`round(probability)`), compares against the provided ground-truth `answers` list, and computes percent-correct.
        - Implements pass/fail logic: `passed_challenge = (percentage_identified >= 63)`.
    - **Visualisation utilities**
        - `plotImages(images_arr, probabilities=False)` helper displays single images and, when provided, overlays per-image probability labels (e.g., “72.34% dog”).
        - Training/validation accuracy and loss plots make it easy to inspect overfitting and convergence.
    - **Robust test ordering**
        - Ensures the test generator does not shuffle so predictions map correctly to the expected answer ordering.
    - **Extensibility**
        - Model and pipeline are modular, so the user can:
            - Swap in transfer learning (pretrained `MobileNet`, `VGG`, etc.) for better accuracy.
            - Add callbacks (EarlyStopping, ModelCheckpoint) to improve generalisation and save best weights.
            - Tune augmentation, batch size, or learning rate to push accuracy toward the 70%+ extra credit.
    - **Reproducibility & usability**
        - Notebook includes dataset download/unzip commands (`wget`, `unzip`) for Google Colaboratory convenience.
        - All outputs (training logs, plots, and final pass/fail printout) are produced in the notebook so the user can iteratively debug and improve the model.
- **Development hints/example usage:**
    - Set `batch_size`, `epochs`, `IMG_HEIGHT`, and `IMG_WIDTH` near the top of the notebook and tune if needed.
    - Verify `flow_from_directory` counts — expected output:
      ```
      Found 2000 images belonging to 2 classes.
      Found 1000 images belonging to 2 classes.
      Found 0 images belonging to 0 classes.
      ```
    - If validation accuracy plateaus or overfits, try adding dropout, reducing the model capacity, or increasing augmentation.
    - For faster gains, replace the convolutional stack with a pretrained model and fine-tune the top layers.
- **Example notebook output:**
    ```
    Your model correctly identified 74.0% of the images of cats and dogs.
    You passed the challenge!
    ```

### 3. Book Recommendation Engine using KNN
- **Description:**  This project implements a book-to-book recommendation engine using the K-Nearest Neighbours (KNN) algorithm. The notebook ingests the Book-Crossings dataset, filters for statistically significant users and books, converts explicit ratings into a book × user matrix (sparse format), and fits a nearest-neighbour model (cosine distance) to find books that are "close" in rating-space. Given a book title, the system returns a ranked list of similar books together with their distances.
- **Objective:**  Build a function `get_recommends(book)` that, for any book title in the filtered dataset, returns the input title plus a list of five similar books and their distances. Preprocessing must remove low-support rows/columns (users with < 200 ratings and books with < 100 ratings) so recommendations are based on statistically meaningful data. The recommender should use `sklearn.neighbors.NearestNeighbors` (cosine metric) on a sparse Compressed Sparse Row (CSR) matrix derived from the pivoted ratings.
- **Features:**  
    - **Support filtering for statistical significance**
        - Drops users with fewer than 200 ratings and books with fewer than 100 ratings to avoid noisy, under-sampled items influencing neighbours.
    - **Pivot to book × user matrix**
        - Builds a dense/filled pivot table indexed by book title with users as columns and rating values as entries; missing ratings are filled with zeros (implicit “not rated”).
    - **Sparse matrix conversion**
        - Converts the pivot table into a SciPy `csr_matrix` to keep memory usage manageable and to speed up nearest-neighbour queries.
    - **Cosine-distance KNN model**
        - Trains `NearestNeighbors(metric='cosine', algorithm='brute')` on the sparse book-user matrix so “closeness” reflects similarity in rating patterns across users.
    - **Robust recommendation function (`get_recommends`)**
        - Locates the book's row index in the matrix, queries `kneighbors` to return the nearest neighbours, and formats the response as:
          ```
          [ input_book_title,
            [
              [recommended_title_1, distance_1],
              [recommended_title_2, distance_2],
              ...
            ]
          ]
          ```
        - Excludes the query book itself from the returned recommendations (the model returns the book at distance 0 as one neighbour).
    - **Distance semantics**
        - Uses cosine distance (0 = identical direction, larger → less similar). Distances are returned as floats so callers can threshold or display a similarity score.
    - **Deterministic, testable output**
        - Because the test harness uses fixed preprocessed data and deterministic KNN parameters, the returned recommendations and distances are reproducible for unit testing.
    - **Tunable hyperparameters**
        - `n_neighbors`, metric (cosine, euclidean), filtering thresholds, and algorithm choice are easily changeable to experiment with recall/precision tradeoffs.
    - **Extensibility**
        - Architecture allows swapping or combining KNN with other methods (e.g., matrix factorisation, Singular Value Decomposition (SVD), or content-based features using book metadata) to form hybrid recommenders.
    - **Performance considerations**
        - Uses sparse data structures and a brute-force but vectorised nearest-neighbour approach; for larger filtered sets, approximate nearest neighbour libraries (Annoy, Faiss) or dimensionality reduction (SVD/TruncatedSVD) can be added for speed.
- **Development & usage hints:**
    - Call `get_recommends("Some Book Title")` to obtain recommended titles and distances. The function expects the exact title as present in the pivot index.
    - If the book is not in the filtered dataset (was removed by the min-count filters), the function should be guarded (or the user informed) since the matrix will not contain that title.
    - To change sensitivity, adjust the filtering thresholds (users/books) or the number of neighbours requested (`n_neighbors` in `kneighbors`).
    - For improved recommendations, consider:
        - Replacing zero fills with user/item baseline corrections (centre ratings per user/book).
        - Using cosine similarity on normalised ratings (subtracting user mean) or using Pearson correlation.
        - Applying dimensionality reduction (TruncatedSVD) before KNN for faster queries and noise reduction.
- **Example usage & expected result format:**
    ```py
    >>> get_recommends("The Queen of the Damned (Vampire Chronicles (Paperback))")
    [
      'The Queen of the Damned (Vampire Chronicles (Paperback))',
      [
        ['Catch 22', 0.793983519077301],
        ['The Witching Hour (Lives of the Mayfair Witches)', 0.7448656558990479],
        ['Interview with the Vampire', 0.7345068454742432],
        ['The Tale of the Body Thief (Vampire Chronicles (Paperback))', 0.5376338362693787],
        ['The Vampire Lestat (Vampire Chronicles, Book II)', 0.5178412199020386]
      ]
    ]
    ```
    - Note: Actual recommended titles and distances will depend on the filtered dataset and KNN parameters; the format above is the required structure used by the project tests.

### 4. Linear Regression Health Costs Calculator
- **Description:**  This notebook implements a regression pipeline that predicts individual healthcare expenses using a tabular insurance dataset. The solution is written for Google Colaboratory and follows a standard supervised-learning workflow: categorical encoding, train/test splitting, feature scaling, model definition, training (with early stopping), and final evaluation. The goal is to produce a model whose Mean Absolute Error (MAE) on held-out data is **under \$3,500**, meaning predictions are on average within \$3,500 of true expenses.
- **Objective:**  Build and train a regression model that learns to predict the `expenses` column from demographic and policy features. The implementation must:
  - Convert categorical inputs (sex, smoker, region) to numeric features.
  - Use an 80/20 train/test split and separate labels (`train_labels`, `test_labels`) from features.
  - Scale numeric features before training (important for neural networks).
  - Define, compile, and train a neural-network regression model that returns a single continuous output.
  - Use early stopping and validation to avoid overfitting.
  - Achieve test MAE < 3500 to pass the challenge.
- **Features:**  
    - **Categorical encoding**
        - One-hot encodes categorical variables using `pd.get_dummies(..., drop_first=True)` so the model receives numeric inputs and avoids simple multicollinearity.
    - **Train/test split & label separation**
        - Uses `sklearn.model_selection.train_test_split(..., test_size=0.2, random_state=42)` to create deterministic 80/20 splits.
        - Pops off the `expenses` column to produce `train_labels` and `test_labels` for supervised training.
    - **Feature scaling**
        - Applies `StandardScaler()` fitted on the training set and transforms both train and test sets to produce `train_dataset` and `test_dataset` (float32), improving neural net convergence.
    - **Modular model builder**
        - `build_model(input_shape)` returns a compiled `tf.keras.Sequential` regression model:
            - Example architecture: Dense layers [128 → 64 → 32] with Rectified Linear Unit (ReLU) activations and a final single linear output unit.
            - Compiled with `Adam` optimiser, `mse` loss and metrics `['mae', 'mse']` so evaluate() returns MAE directly.
    - **Training loop with early stopping**
        - Uses `model.fit(...)` with `validation_split=0.2`, configurable `epochs`, `batch_size`, and an `EarlyStopping` callback monitoring `val_mae` (with `restore_best_weights=True`) to stop when validation MAE stops improving.
    - **History tracking & visualisation**
        - Training history is recorded and plotted (train vs validation MAE) so the user can visually inspect convergence and overfitting.
    - **Evaluation & prediction**
        - `model.evaluate(test_dataset, test_labels)` returns test loss and MAE; pass/fail logic compares MAE to the \$3,500 threshold.
        - Test predictions are plotted against true expenses with an identity line to visualise prediction quality.
    - **Numeric types & grader compatibility**
        - Ensures `train_dataset`, `test_dataset`, `train_labels`, and `test_labels` are cast to `np.float32` (as expected by many graders and TensorFlow).
    - **Hyperparameter & architecture flexibility**
        - Learning rate, layer sizes, regularisation (Dropout, L2), batch size, and patience for early stopping are easily tunable to improve MAE.
    - **Extensibility & best-practice suggestions**
        - Add feature engineering (interaction terms, polynomial features) or try simpler models (linear regression, tree-based models) as baselines.
        - Consider regularisation, dropout, or smaller architectures to reduce overfitting.
        - Try K-fold cross-validation and robust scalers if outliers are present.
- **Quick tips for passing the challenge:**
    - Ensure categorical encoding is correct and the same transformation is applied to train/test sets.
    - Scale features before training and pass float32 arrays to the model.
    - Use validation and early stopping to get a low validation MAE and avoid overfitting.
    - If MAE is above the threshold, try reducing model capacity, adding regularisation, or tuning the learning rate and batch size.
- **Example final output:**
    ```
    Testing set Mean Abs Error: 2447.30 expenses
    You passed the challenge. Great job!
    ```

### 5. Neural Network SMS Text Classifier
- **Description:**  This notebook implements an SMS spam classifier using a neural network built with TensorFlow/Keras. The pipeline ingests labelled SMS messages, vectorises text into integer sequences, learns embeddings, and trains a recurrent neural network (Bidirectional Long Short-Term Memory (LSTM)) to output a spam probability. The project is packaged as a Google Colaboratory-friendly notebook and includes a `predict_message` convenience function that returns a numeric probability and a human-readable label (`"ham"` or `"spam"`).
- **Objective:**  Train a model that classifies SMS messages as `ham` (legitimate) or `spam` with high accuracy on held-out data. Provide a function `predict_message(text)` which:
  - Accepts a single string message.
  - Returns a two-element list: `[probability_of_spam_between_0_and_1, "spam" or "ham"]`.
  - Uses the same preprocessing (vectoriser, max length, tokenisation) used during training, so runtime predictions match training semantics.
- **Features:**  
    - **Text vectorisation**
        - Uses `tf.keras.layers.TextVectorization` to tokenise and integer-encode raw SMS text into fixed-length sequences (`output_sequence_length = max_length`), capped to `vocab_size` tokens.
        - `vectorizer.adapt(train_messages)` builds the vocabulary from training data to ensure consistent token-to-index mapping.
    - **Embedding layer**
        - Learns low-dimensional dense vector representations for tokens via an `Embedding(vocab_size, embedding_dim)` layer, which feeds into the sequence model.
    - **Bidirectional LSTM encoder**
        - Uses a `Bidirectional(LSTM(...))` to capture both past and future context in short SMS sequences, improving the model's ability to detect patterns associated with spam.
    - **Dense classifier head**
        - One or more dense layers (e.g., `Dense(64, activation='relu')` with `Dropout`) followed by a single-unit `sigmoid` output produce a probability of being spam.
    - **Binary training pipeline**
        - Labels encoded as 0 (`ham`) and 1 (`spam`), and the model is compiled with `binary_crossentropy` loss and `accuracy` metric.
        - Model trained with `model.fit(vectorizer(train_messages), train_labels, validation_data=(vectorizer(test_messages), test_labels))`.
    - **Prediction helper: `predict_message`**
        - Vectorises the input string with the same `TextVectorization` layer used at training time.
        - Calls `model.predict(...)` and returns `[probability, label]` where `label` is `'spam'` when `probability > 0.5`, otherwise `'ham'`.
        - Returns probability as a float in `[0,1]` so callers can adjust threshold if desired.
    - **Evaluation & test harness compatibility**
        - Notebook includes a test cell that exercises `predict_message` against several example messages to verify correctness and compatibility with project tests.
        - Deterministic vocabulary building (`vectorizer.adapt`) and a fixed random seed (optional) keep results reproducible for grading.
    - **Visualisation & diagnostics**
        - Training history (accuracy and loss curves) and confusion-matrix-style checks help inspect model behaviour and identify common misclassifications.
    - **Extensibility & improvements**
        - The code structure is modular, so you can:
            - Increase `vocab_size` or `max_length` for longer/rarer tokens.
            - Replace LSTM with Gated Recurrent Unit (GRU) or 1D convolutional layers for speed.
            - Add pretrained embeddings (Global Vectors for Word Representation (GloVe)) or use transfer learning from transformer-based text encoders for better accuracy.
            - Calibrate threshold or use Receiver Operating Characteristic (ROC)/Area Under the Curve (AUC) to choose an operating point suited to false-positive tolerance.
    - **Production notes**
        - For deployment, freeze the `vectoriser` vocabulary (save it) and the trained model weights so runtime predictions remain stable.
        - Consider preprocessing normalisation (lowercasing, punctuation handling) to reduce noisy tokens for improved generalisation.
- **Example usage/output:**
    ```py
    >>> predict_message("how are you doing today?")
    [0.0234123, "ham"]
    >>> predict_message("You have won £1000! Call now to claim your prize")
    [0.982341, "spam"]
    ```
    
---

## Technologies Used

- **Programming Languages**
  - Python 3

- **Libraries & Frameworks**
  - TensorFlow / Keras (CNNs, LSTMs, training utilities)
  - NumPy (numerical operations)
  - pandas (data processing)
  - Matplotlib (visualisation)
  - scikit-learn (KNN, preprocessing, train/test splits, evaluation metrics)
  - Natural Language Toolkit (NLTK) (tokenisation and stopwords)
  - TensorFlow Datasets (dataset loading where applicable)
 
---

## How to Run Locally

1. **Clone the repository**
    ```bash
    git clone https://github.com/LeeIsaac1201/LeeIsaac1201.git
    cd freeCodeCamp/Machine-Learning-with-Python
    ```

2. **Navigate to the project folder**
   Replace the folder name with the project you want to run:
    ```bash
    cd "Cat and Dog Image Classifier"
    # or
    cd "Book Recommendation Engine using KNN"
    # or
    cd "Copyright Checker"
    # or
    cd "Linear Regression Health Costs Calculator"
    # or
    cd "SMS Text Classifier"
    ```

3. **Install dependencies**
    > All of these projects use Python. Install requirements (if a requirements file exists in the folder):
    ```bash
    pip install -r requirements.txt
    ```
    Otherwise, manually install the core libraries:
    ```bash
    pip install numpy pandas matplotlib scikit-learn tensorflow nltk
    ```

4. **Run the notebook**
    > These are Jupyter/Colab-style projects.
    ```bash
    jupyter notebook
    ```
    Then open the relevant `.ipynb` file for the project.

---

## Notes
1. Replit and Google Colaboratory links on my freeCodeCamp profile will **not work** because the Replit projects were removed to free up space on the free plan, so those links are now inactive.
2. These projects were originally developed and tested in Google Colaboratory, so:
   - You may need to adjust **file paths**,  
   - Upload datasets manually (e.g., images for the CNN classifier),  
   - Ensure your Graphics Processing Unit (GPU) acceleration is enabled when required.
3. Some algorithms (CNN, LSTM) may run slowly on local CPUs. For best performance, use Google Colaboratory or a machine with GPU support.
4. The repository structure groups multiple machine learning projects under the same folder. Each project is self-contained within its own directory, so you can run them independently.
5. Dataset files are not included if they exceed GitHub size limits. Each notebook contains instructions for downloading or loading the required datasets.
