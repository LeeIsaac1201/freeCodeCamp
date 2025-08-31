def add_time(start, duration, day=None):
    # Parse the start time into hour, minute, and AM/PM period
    time_part, period = start.split()
    start_hour, start_minute = map(int, time_part.split(':'))
    period = period.upper()

    # Convert start time to 24-hour format for easier calculation
    if period == 'PM' and start_hour != 12:
        start_hour += 12
    if period == 'AM' and start_hour == 12:
        start_hour = 0

    # Parse the duration into hours and minutes
    dur_hours, dur_minutes = map(int, duration.split(':'))

    # Add minutes and calculate any extra hours from minute overflow
    total_minutes = start_minute + dur_minutes
    extra_hours, new_minute = divmod(total_minutes, 60)

    # Add hours (including any carried over from minutes) to get total hours
    total_hours = start_hour + dur_hours + extra_hours
    days_later, new_hour_24 = divmod(total_hours, 24)  # Calculate days passed and new hour in 24-hour format

    # Convert back to 12-hour format and determine new AM/PM period
    new_period = 'AM' if new_hour_24 < 12 else 'PM'
    new_hour = new_hour_24 % 12
    if new_hour == 0:
        new_hour = 12

    # Build the new time string in the required format
    new_time = f"{new_hour}:{new_minute:02d} {new_period}"

    # If a starting day is provided, calculate the new day of the week
    if day:
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        # Normalise input day to match list
        day_index = days.index(day.strip().capitalize())
        new_day = days[(day_index + days_later) % 7]
        new_time += f", {new_day}"

    # Append day count notation if the result is the next day or later
    if days_later == 1:
        new_time += " (next day)"
    elif days_later > 1:
        new_time += f" ({days_later} days later)"

    return new_time
