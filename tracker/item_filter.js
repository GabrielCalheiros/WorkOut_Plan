
ids_to_remove_warmup = ["A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12"]
warmup = warmup.filter(item => !ids_to_remove_warmup.includes(item.id));
