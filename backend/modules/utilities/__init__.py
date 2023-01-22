def getMessage(errors):
    return ' '.join(str(x[0]) for x in errors.values())