#!/usr/bin/env node

import { cwd } from "process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { flatToNested } from "../lib/index.js";

const options = {
  revert: {
    default: false,
    description: "Revert to a flat colocated component structure",
    type: "boolean",
  },
};

const args = yargs(hideBin(process.argv)).options(options).argv;

flatToNested(cwd(), args);
