#!/usr/bin/env node

"use strict";

const { cwd } = require("process");
const { hideBin } = require("yargs/helpers");
const yargs = require("yargs/yargs");
const flatToNested = require("../lib");

const options = {
  revert: {
    default: false,
    description: "Revert to a flat colocated component structure",
    type: "boolean",
  },
};

const args = yargs(hideBin(process.argv)).options(options).argv;

flatToNested(cwd(), args);
