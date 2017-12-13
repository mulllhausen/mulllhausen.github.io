addEvent(window, 'load', function() {
    document.getElementById('timestamp1').value = unixtime(); // init
    updateTarget1FromBits1(); // init
    addEvent(document.getElementById('bits1'), 'keyup, change', function() {
        updateTarget1FromBits1();
        mine1AndRenderResults();
    });

    addEvent(document.getElementById('btnRunHash0'), 'click', function() {
        var preImage = document.getElementById('inputPreImage0').value;
        var bitArray = sjcl.hash.sha256.hash(preImage);
        var sha256Hash = sjcl.codec.hex.fromBits(bitArray);
        document.getElementById('spanHash0').innerText = sha256Hash;
    });

    addEvent(document.getElementById('btnRunHash1'), 'click', mine1AndRenderResults);
    borderTheDigits('.individual-digits');
});

function updateTarget1FromBits1() {
    bits1 = document.getElementById('bits1').value; // global
    document.getElementById('target1').innerText = bits2target(bits1);
    borderTheDigits('#target1');
}

var gotStaticBlockFields1 = false;
function mine1AndRenderResults() {
    if (!gotStaticBlockFields1) {
        gotStaticBlockFields1 = true;
        version1 = document.getElementById('version1').value;
        prevHash1 = document.getElementById('prevHash1').value;
        merkleRoot1 = document.getElementById('merkleRoot1').value;
        timestamp1 = document.getElementById('timestamp1').value;
        bits1 = document.getElementById('bits1').value;
        nonce1 = document.getElementById('nonce1').value;
        target1 = bits2target(bits1);
    }
    var minedResult = mine(
        version1, prevHash1, merkleRoot1, timestamp1, bits1, nonce1, target1
    );
    document.getElementById('blockhash1').innerText = minedResult.blockhash;
    borderTheDigits('#blockhash1');

    document.getElementById('mineStatus1').innerText = (minedResult.status ? 'pass' : 'fail');
    document.getElementById('mine1Popup').style.display = (minedResult.status ? 'table' : 'none');

    nonce1 = parseInt(nonce1) + 1;
    document.getElementById('nonce1').value = nonce1;
}

function borderTheDigits(cssSelectors) {
    var subjectEls = document.querySelectorAll(cssSelectors);
    for (var i = 0; i < subjectEls.length; i++) {
        var text = subjectEls[i].innerText; // get
        var newText = '';
        for (var letterI = 0; letterI < text.length; letterI++) {
            newText += '<span class="individual-digit">' + text[letterI] + '</span>';
        }
        subjectEls[i].innerHTML = newText; // set
    }
}

function mine(version, prevHash, merkleRoot, timestamp, bits, nonce, target) {
    var bitArray = sjcl.hash.sha256.hash(
        version + prevHash + merkleRoot + timestamp + bits + nonce
    );
    var bitArray2 = sjcl.hash.sha256.hash(bitArray);
    var sha256hash = sjcl.codec.hex.fromBits(bitArray2);
    return {
        blockhash: sha256hash,
        status: hexCompare(sha256hash, target) // sha256 < target ?
    };
}

function bits2target(bits) {
    if (bits.length != 8) return null;

    var len = hex2int(bits.substring(0, 2)); // just byte 1
    var msbytes = bits.substring(2);
    var target = msbytes; // init
    var numTrailingBytes = len - (msbytes.length / 2);
    if (numTrailingBytes > 0) target += '00'.repeat(numTrailingBytes);

    if (target.length == 64) return target;

    // make up to 32 bytes
    if (target.length < 64) return '0'.repeat(64 - target.length) + target;

    // chop down to the last 32 bytes
    //if (target.length > 64) return target.substr(-64);
}

// true if hex1 < hex2
function hexCompare(hex1, hex2) {
    // first, chop off leading zeros
    hex1 = hex1.replace(/^0*/, '');
    hex2 = hex2.replace(/^0*/, '');

    // if hex1 is shorter than hex2 then it is smaller
    if (hex1.length != hex2.length) return (hex1.length < hex2.length);

    // loop through from msb to lsb until there is a difference
    for (var nibbleI = 0; nibbleI < hex1.length; nibbleI++) {
        var hex1Nibble = hex1[nibbleI];
        var hex2Nibble = hex2[nibbleI];
        if (hex1Nibble == hex2Nibble) continue;
        return (hex2int(hex1Nibble) < hex2int(hex2Nibble));
    }
    return false;
}

function hex2int(hex) {
    return parseInt(hex, 16);
}

function int2hex(intiger) {
    return intiger.toString(16);
}

