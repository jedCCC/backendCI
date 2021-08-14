encrypt
decrypt

hash


a -> x encrypt
x -> a decrypt

a -> x hash
x !-> a 


Dictionary attack + brute force

a -> x
b -> y


hash + salt(bcrypt)

hash(a + salt) -> salt1+x
hash(b + salt) -> salt2+y

hash + salt + pepper


