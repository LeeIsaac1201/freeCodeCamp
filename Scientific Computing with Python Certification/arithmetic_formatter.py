def arithmetic_arranger(problems, show_answers=False):
    # Check for too many problems (more than 5)
    if len(problems) > 5:
        return "Error: Too many problems."

    # Prepare lists to hold each line of the arranged problems
    first_line  = []
    second_line = []
    dash_line   = []
    answer_line = []

    # Process each arithmetic problem
    for prob in problems:
        parts = prob.split()
        # Each problem must have exactly two operands and one operator
        if len(parts) != 3:
            return "Error: Invalid problem format."

        a, op, b = parts

        # Only '+' or '-' operators are allowed
        if op not in ("+", "-"):
            return "Error: Operator must be '+' or '-'."

        # Operands must only contain digits
        if not (a.isdigit() and b.isdigit()):
            return "Error: Numbers must only contain digits."

        # Operands must not be more than four digits
        if len(a) > 4 or len(b) > 4:
            return "Error: Numbers cannot be more than four digits."

        # Determine the width needed for formatting (largest operand + 2)
        width = max(len(a), len(b)) + 2

        # Format the top operand, right-aligned
        first_line.append(a.rjust(width))
        # Format the operator and bottom operand, right-aligned
        second_line.append(op + " " + b.rjust(width - 2))
        # Create the dash line matching the width of the problem
        dash_line.append("-" * width)

        # If answers should be shown, calculate and format the result
        if show_answers:
            result = str(int(a) + int(b)) if op == "+" else str(int(a) - int(b))
            answer_line.append(result.rjust(width))

    # Join each part with four spaces between problems
    arranged  = "    ".join(first_line)  + "\n"
    arranged += "    ".join(second_line) + "\n"
    arranged += "    ".join(dash_line)

    # Add the answers line if requested
    if show_answers:
        arranged += "\n" + "    ".join(answer_line)

    return arranged
