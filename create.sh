#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

PROJECT_NAME=$1

mkdir $PROJECT_NAME

cd $PROJECT_NAME

touch notes.md
touch index.js

DATA=$(cat <<EOF
<!DOCTYPE html>
<html lang="cs">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>První Stránka</title>
    </head>
    <script src="index.js"></script>
    <body></body>
</html>
EOF
)

echo "$DATA" > index.html

mkdir excercise