# Function to check if a number is prime
def is_prime(n):
    """Returns True if the number is prime, otherwise False."""
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Example usage
if __name__ == "__main__":
    test_number = 29
    print(f"Is {test_number} a prime number? {is_prime(test_number)}")
Hello!

As part of Hacktoberfest 2024, I’ve added a simple is_prime function in Python that checks if a number is prime. Here’s a quick overview of the contribution:

is_prime(n): A function that determines if a number is prime by checking divisibility.
Example usage to test functionality with a sample number.
Please consider accepting my pull request for Hacktoberfest 2024. I look forward to contributing and hope this function adds value to the project!

Thank you! 😊
