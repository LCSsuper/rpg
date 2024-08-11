#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RPGBackendStack } from "../lib/backend-stack";

const app = new cdk.App();
new RPGBackendStack(app, "RPGBackendStack", {});
