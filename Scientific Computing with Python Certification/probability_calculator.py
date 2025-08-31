# Import modules for deep copying objects and random selection
import copy
import random

class Hat:
    def __init__(self, **balls):
        # Initialise the hat with a list of balls, one entry per ball colour
        self.contents = []
        for color, count in balls.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls_to_draw):
        # Randomly remove and return num_balls_to_draw balls from the hat (without replacement)
        # If num_balls_to_draw exceeds available balls, return all balls
        drawn = []
        draw_count = min(num_balls_to_draw, len(self.contents))
        for _ in range(draw_count):
            idx = random.randrange(len(self.contents))
            drawn.append(self.contents.pop(idx))
        return drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    # Run the experiment num_experiments times to estimate the probability
    # Each experiment: copy the hat, draw balls, and check if drawn balls meet or exceed expected_balls
    success_count = 0

    for _ in range(num_experiments):
        # Deep copy the hat to avoid mutating the original between experiments
        trial_hat = copy.deepcopy(hat)
        drawn_balls = trial_hat.draw(num_balls_drawn)

        # Count occurrences of each colour in the drawn balls
        counts = {}
        for ball in drawn_balls:
            counts[ball] = counts.get(ball, 0) + 1

        # Check if all expected colours are present in at least the required quantity
        success = True
        for color, required in expected_balls.items():
            if counts.get(color, 0) < required:
                success = False
                break

        if success:
            success_count += 1

    # Return the estimated probability as the ratio of successful experiments
    return success_count / num_experiments
