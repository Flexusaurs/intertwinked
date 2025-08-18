<!------------------------------------------------------------------------------------
   Add Rules to this file or a short description and have Kiro refine them for you:   
-------------------------------------------------------------------------------------> 

in order for the app to be completely decentralized, the final build has to be pinned to IPFS.
the CI pipeline should check for no failing tests and then compile and build everything using github actions. the CD has to pin the final files and host them on IPFS in order for the app to not rely on a central traditional cloud host or server. to be completely decentralized. the app has to be completely containerized, after the ci the app image will be updated, and in the CD job will be deployed - deploying the webapp and website to the IPFS network, on ipfs.io.

