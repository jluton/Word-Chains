# Word-Chains

#Notes on this design
This approach works by generating a set of all words in the dictionary, and exporting a function that can use that set. 

The word chain finder works by using two queues to preferrentially search through a decision tree. Words that bring the current word one letter closer to the target are prioritized.
