var savedInternal = undefined;

function update() {
    
}

function stop() {
    clearInterval(savedInternal);
}

function main() {
    savedInternal = setInterval(update, 1000 / 60);
}

main();