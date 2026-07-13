#!/bin/bash

rsync -av --delete ~/assets/ ./public/assets/
git add public/assets