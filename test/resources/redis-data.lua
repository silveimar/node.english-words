
-- clear out the whole db
redis.call ('FLUSHDB')

-- Setting some key on redis
redis.call ("SET","KEY-1","{ 'word': 'Abate', 'meaning': 'To decrease: reduce'}")
redis.call ("SET","KEY-2","{ 'word': 'Abdicate', meaning: 'To give up a position, right, or power' }")
redis.call ("SET","KEY-3","{ 'word': 'Abysmal', meaning: 'extremely bad; appalling.' }")
redis.call ("SET","KEY-4","{ 'word': 'Sedulous', meaning: 'showing dedication and diligence.' }")
redis.call ("SET","KEY-5","{ 'word': 'Onerous', meaning: '(of a task, duty, or responsibility) involving an amount of effort and difficulty that is oppressively burdensome.' }")
redis.call ("SET","KEY-6","{ 'word': 'Shard', meaning: 'A piece of broken ceramic, metal, glass, or rock, typically having sharp edges.' }")
redis.call ("SET","KEY-7","{ 'word': 'Unfeigned', meaning: 'Genuine; sincere.' }")
redis.call ("SET","KEY-8","{ 'word': 'Untoward', meaning: 'Unexpected and inappropriate or inconvenient.' }")
redis.call ("SET","KEY-9","{ 'word': 'Irascible', meaning: 'Having or showing a tendency to be easily angered.' }")
redis.call ("SET","KEY-10","{ 'word': 'Axiomatic', meaning: 'Self-evident or unquestionable.' }")

-- keep this as the last line
return true
