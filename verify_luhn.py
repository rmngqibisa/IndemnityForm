def luhn_check(id_num):
    if not id_num.isdigit() or len(id_num) != 13:
        return False

    total = 0
    # Loop through digits from right to left
    # But typical implementation:
    # 1. Double every second digit from the right.
    # 2. Subtract 9 if > 9.
    # 3. Sum all digits.
    # 4. Mod 10 == 0.

    # Python slices: [::-1] reverses string
    reversed_digits = [int(d) for d in id_num[::-1]]

    for i, digit in enumerate(reversed_digits):
        if i % 2 == 1: # Every second digit (1, 3, 5... 0-based index)
            doubled = digit * 2
            if doubled > 9:
                doubled -= 9
            total += doubled
        else:
            total += digit

    return total % 10 == 0

# Test cases
valid_id = "9202204720082" # Example SA ID (randomly generated valid one for test)
# Let's generate a valid one to be sure.
# 920220 4720 08 C
# 9 2 0 2 2 0 4 7 2 0 0 8
# R: 8 0 0 2 7 4 0 2 2 0 2 9
# i: 0 1 2 3 4 5 6 7 8 9 10 11
# D: 8   0   7   0   2   2
# O:   0   2   4   2   0   9
# Doubled:
# 0 -> 0
# 2 -> 4
# 4 -> 8
# 2 -> 4
# 0 -> 0
# 9 -> 18 -> 9
# Sum odds: 0+4+8+4+0+9 = 25
# Sum evens: 8+0+7+0+2+2 = 19
# Total = 44.
# Next multiple of 10 is 50. 50-44 = 6.
# So Check digit should be 6?
# Wait, let's re-verify my manual calc.
# ID: 9 2 0 2 2 0 4 7 2 0 0 8 C
# rev: C 8 0 0 2 7 4 0 2 2 0 2 9
# i:   0 1 2 3 4 5 6 7 8 9 10 11 12
# i%2==1: 8, 0, 7, 0, 2, 2. (Indices 1,3,5,7,9,11) Correct.
# 8*2=16->7
# 0*2=0
# 7*2=14->5
# 0*2=0
# 2*2=4
# 2*2=4
# Sum Doubled: 7+0+5+0+4+4 = 20.
# Sum Others (C, 0, 2, 4, 2, 0, 9): C + 0+2+4+2+0+9 = C + 17.
# Total = 20 + 17 + C = 37 + C.
# (37+C) % 10 == 0.
# if C=3, 40%10=0.
# So valid ID: 9202204720083

print(f"Check 9202204720083: {luhn_check('9202204720083')}")
print(f"Check 9202204720082 (Invalid): {luhn_check('9202204720082')}")

# JS Implementation Plan Check
# In JS loop 0..12.
# i%2==1 (Odd indices: 1, 3... 11).
# String: "9202204720083"
# i=0 (9) -> Even index (Not doubled if 0-based from left?)
# WAIT.
# Python logic: reversed -> i%2==1 is 2nd digit from right.
# JS logic: if loop 0..12 (Left to Right).
# Total digits = 13 (Odd length).
# Rightmost is index 12 (Even).
# 2nd from right is index 11 (Odd).
# So in 0-based Left-to-Right loop, ODD indices (1, 3, 5... 11) should be doubled.
# 9 (0): No
# 2 (1): Double
# ...
# This matches my manual logic above?
# Manual logic:
# ID: 9 2 0 2 2 0 4 7 2 0 0 8 3
# i:  0 1 2 3 4 5 6 7 8 9 10 11 12
# Odd indices: 1 (2), 3 (2), 5 (0), 7 (7), 9 (2), 11 (8).
# Values: 2, 2, 0, 7, 2, 8.
# Double: 4, 4, 0, 14->5, 4, 16->7.
# Sum Doubled: 4+4+0+5+4+7 = 24.
# Sum Others (Even indices): 0(9), 2(0), 4(2), 6(4), 8(2), 10(0), 12(3).
# Values: 9, 0, 2, 4, 2, 0, 3.
# Sum: 9+0+2+4+2+0+3 = 20.
# Total = 24+20 = 44.
# 44 % 10 != 0.
# My Python manual calc was:
# rev: C(3) 8 0 0 2 7 4 0 2 2 0 2 9
# i=1 (8) -> Double -> 16->7.
# i=3 (0) -> Double -> 0.
# i=5 (7) -> Double -> 14->5.
# i=7 (0) -> Double -> 0.
# i=9 (2) -> Double -> 4.
# i=11(2) -> Double -> 4.
# Sum Doubled: 7+0+5+0+4+4 = 20.
# Sum Others (i=0,2,4,6,8,10,12): 3, 0, 2, 4, 2, 0, 9.
# Sum Others: 3+0+2+4+2+0+9 = 20.
# Total = 40.
# OK.
# So "Every second digit from the right" corresponds to ODD INDICES (1, 3, 5... 11) in a 0-based 13-digit string.
# My JS logic `i % 2 === 1` inside `for (let i = 0; i < 13; i++)` is CORRECT.
