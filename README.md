# security-experiment-rogue-npm-module
This is an experiment of a rogue npm module. DO NOT INSTALL !

## context
In the context of my current mission, I'm doing research on JS security and how to prevent some kind of security breach.
This is a demo for a presentation to my company.

## Details
This module, once required (expose an innocent «hello world» method),
will try to hook into JS standard API to intercept plain objects with interesting keys (aka. "password").
It will then try to exfiltrate them via different methods.

This is a proof of concept. No sensitive data should be at risk BUT you'd rather not use it with truly sensitive data.

Only tested in latest Chrome browser environment (this is a proof of concept !)

## Follow up
I then like to experiment counter-measures.
