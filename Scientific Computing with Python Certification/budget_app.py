class Category:
    def __init__(self, name):
        # Initialise category with a name and an empty ledger list
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        # Add a deposit to the ledger with amount and optional description
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        # Attempt to withdraw amount from the ledger if funds are sufficient, and store the withdrawal as a negative amount 
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        # Calculate and return the current balance by summing all ledger amounts
        return sum(item["amount"] for item in self.ledger)

    def transfer(self, amount, category):
        # Transfer amount to another category if funds are sufficient, and record withdrawal in this category and deposit in the target category
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        # Check if the current balance is enough for the requested amount
        return amount <= self.get_balance()

    def __str__(self):
        # Return a formatted string representation of the category ledger
        title = f"{self.name:*^30}\n"
        items = ""
        # List each ledger entry: description (max 23 chars) and amount (right-aligned, 2 decimals, max 7 chars)
        for item in self.ledger:
            desc = item["description"][:23]
            amt = f"{item['amount']:>7.2f}"
            items += f"{desc:<23}{amt}\n"
        # Show the total balance at the bottom
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    # Calculate total spent per category (sum of negative amounts in each ledger)
    spends = [
        sum(-entry["amount"] for entry in cat.ledger if entry["amount"] < 0)
        for cat in categories
    ]
    total_spent = sum(spends)

    # Compute percentage spent per category, rounded down to nearest 10
    percents = [int((spend / total_spent) * 100) // 10 * 10 for spend in spends]

    # Build the bar chart header
    chart = "Percentage spent by category\n"
    # Draw chart lines for each 10% level from 100 down to 0
    for level in range(100, -1, -10):
        line = f"{level:>3}| "
        for pct in percents:
            # Place 'o' if category percent is at least this level, else space
            line += "o  " if pct >= level else "   "
        chart += line + "\n"

    # Add horizontal separator line (length depends on number of categories)
    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    # Prepare vertical labels for category names, one letter per line
    max_length = max(len(cat.name) for cat in categories)
    for i in range(max_length):
        line = "     "
        for cat in categories:
            # Add letter if exists for this row, else space
            if i < len(cat.name):
                line += cat.name[i] + "  "
            else:
                line += "   "
        # Add newline except for the last line
        if i < max_length - 1:
            chart += line + "\n"
        else:
            chart += line

    return chart
