#!/bin/bash

#if arg is not set
if [ -z "$1" ]
then
    echo "No argument supplied"
    exit 1
fi

mkdir -p $1

cd $1

HTML=$(cat <<EOL
<!DOCTYPE html>
<html lang="cs">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Super stránky</title>
        <script src="index.js"></script>
    </head>
    <body></body>
</html>
EOL
)

echo "$HTML" > index.html

touch index.js