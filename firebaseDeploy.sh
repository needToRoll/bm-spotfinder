#!bin/bash
ng build
cp ./language-meta-redirect.html ./dist/bm-spotfinder/index.html
firebase deploy
