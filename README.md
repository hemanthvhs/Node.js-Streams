# Streams

Streams process (read or write) the data piece by piece (chunks) without completing the whole read or write operation and therefore without keeping all the data in memory.

# References
https://nodejs.org/api/stream.html
https://www.youtube.com/watch?v=Bz0EkaH4S7Y
https://www.youtube.com/watch?v=FS2OWxS5P_E

# Steps

To replicate
1. Run command node insertData.js // This will insert huge volumes of data
2. Go to index.js & uncomment the solutions accordingly & analyze why 
the first two solutions are not the optimum ones.