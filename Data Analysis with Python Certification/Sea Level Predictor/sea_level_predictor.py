import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')

    # Create scatter plot
    plt.figure(figsize=(10, 6))
    plt.scatter(df['Year'], df['CSIRO Adjusted Sea Level'], color='blue')

    # Create first line of best fit (all data)
    res_all = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    slope_all = res_all.slope
    intercept_all = res_all.intercept
    x_all = pd.Series(range(df['Year'].min(), 2051))
    y_all = slope_all * x_all + intercept_all
    plt.plot(x_all, y_all, color='red')

    # Create second line of best fit (from 2000 onward)
    df_recent = df[df['Year'] >= 2000]
    res_recent = linregress(df_recent['Year'], df_recent['CSIRO Adjusted Sea Level'])
    slope_recent = res_recent.slope
    intercept_recent = res_recent.intercept
    x_recent = pd.Series(range(2000, 2051))
    y_recent = slope_recent * x_recent + intercept_recent
    plt.plot(x_recent, y_recent, color='green')

    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.title('Rise in Sea Level')

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()
