class Rectangle:
    def __init__(self, width, height):
        # Initialise rectangle with width and height
        self.width = width
        self.height = height

    def set_width(self, width):
        # Set the width of the rectangle
        self.width = width

    def set_height(self, height):
        # Set the height of the rectangle
        self.height = height

    def get_area(self):
        # Return the area (width * height)
        return self.width * self.height

    def get_perimeter(self):
        # Return the perimeter (2 * width + 2 * height)
        return 2 * self.width + 2 * self.height

    def get_diagonal(self):
        # Return the diagonal ((width^2 + height^2) ** 0.5)
        return (self.width**2 + self.height**2) ** 0.5

    def get_picture(self):
        # Return a string picture of the rectangle using '*' characters
        # If width or height > 50, return warning message
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        picture = ""
        for _ in range(self.height):
            picture += "*" * self.width + "\n"
        return picture

    def get_amount_inside(self, shape):
        # Return how many times the passed-in shape fits inside this rectangle (no rotation)
        return (self.width // shape.width) * (self.height // shape.height)

    def __str__(self):
        # Return string representation: Rectangle(width=..., height=...)
        return f"Rectangle(width={self.width}, height={self.height})"


class Square(Rectangle):
    def __init__(self, side):
        # Initialise square with equal width and height
        super().__init__(side, side)

    def set_side(self, side):
        # Set both width and height to the same value for a square
        self.width = side
        self.height = side

    def set_width(self, width):
        # Override to ensure both width and height are updated
        self.set_side(width)

    def set_height(self, height):
        # Override to ensure both width and height are updated
        self.set_side(height)

    def __str__(self):
        # Return string representation: Square(side=...)
        return f"Square(side={self.width})"
