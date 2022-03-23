# Rewritten in JS!

'''
import itertools
import warnings
import math
import re
from random import shuffle

warnings.filterwarnings("ignore")

def main():
    guess_length = 8
    max_op_count = 3

    goal = 17

    alphabet = '1234567890*/+-'
    if guess_length == 8:  # hard mode
        alphabet += '()'
    ops = '+-*/'
    digits = '0123456789'


    # Lower and upper bounds for counts of characters in the answer
    alphabet_min_max = {}
    for char in alphabet:
        min = 0
        max = math.inf

        alphabet_min_max[char] = (min, max)

    # Remove symbols we know aren't in the answer
    alphabet = list(alphabet)
    shuffle(alphabet)
    for char in alphabet:
        if alphabet_min_max[char][1] == 0:
            alphabet.remove(char)
    alphabet = "".join(alphabet)

    print(f'\nPossible symbols: {alphabet}')

    perms = itertools.product(*[alphabet] * guess_length)  # permutations with replacement

    print('\n========== POSSIBLE ANSWERS ==========')

    for permutation in perms:
        exp = "".join(permutation)

        invalid = False

    
        if exp[0] == '+' or exp[0] == '-':
            invalid = True

        if '(' in exp:
            parantheses = re.findall('\((.*?)\)', exp)
            for p in parantheses:
                operatorPresent = False
                if len(p) > 0 and p[0] in ops:
                    invalid = True
                for xyz in p:
                    if xyz not in ops:
                        continue
                    operatorPresent = True
                    break
                    if xyz == '(':
                        invalid = True
                        break
                if not operatorPresent or invalid:
                    invalid = True
                    break
        
        if not invalid:
            for i in range(len(exp) - 1):
                # No two operators in a row (not sure if this is right)
                if exp[i] in ops and exp[i + 1] in ops:
                    invalid = True
                    break
                # No leading 0's
                if exp[i] == '0' and exp[i + 1] in digits:
                    invalid = True
                    break

        if not invalid and not matched(exp):
            invalid = True

        # Check number of operators
        op_count = 0
        for char in exp:
            if char in ops:
                op_count += 1
                if op_count > max_op_count:
                    invalid = True
                    break

        if not invalid:
            try:
                result = eval(exp)
                expWithoutParentheses = exp.replace('(','').replace(')','')
                if result == eval(expWithoutParentheses):
                    invalid = True
                if result == goal and not invalid:
                    print(exp)
            except Exception:
                pass


# https://stackoverflow.com/a/38834005/13176711
def matched(str):
    count = 0
    for i in str:
        if i == "(":
            count += 1
        elif i == ")":
            count -= 1
        if count < 0:
            return False
    return count == 0


if __name__ == '__main__':
    main()
'''