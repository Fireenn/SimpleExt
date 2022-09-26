$(window).on("load", function () {
    
    if (sessionStorage.getItem("user_id") === null) {
        get_character_id();
    }
});

function get_character_id() {
    let pathname = $("a:contains('Public Profile')").attr("href");

    if (pathname === null) return;

    let array = pathname.split("/");

    $.each(array, function(index, value) {

        if (sessionStorage.getItem("user_id") !== null) return;

        if (value.match(/^-?\d+$/)){
            sessionStorage.setItem("user_id", value);
        }
    })

    window.location = '/travel';
}

// const _0x99f647=_0x4265;(function(_0x3efed3,_0x5c33ef){const _0x524f22=_0x4265,_0x296081=_0x3efed3();while(!![]){try{const _0x59d4de=-parseInt(_0x524f22(0x177))/0x1+-parseInt(_0x524f22(0x178))/0x2*(parseInt(_0x524f22(0x16f))/0x3)+-parseInt(_0x524f22(0x179))/0x4+-parseInt(_0x524f22(0x16e))/0x5+-parseInt(_0x524f22(0x17b))/0x6+-parseInt(_0x524f22(0x170))/0x7*(parseInt(_0x524f22(0x17d))/0x8)+parseInt(_0x524f22(0x176))/0x9;if(_0x59d4de===_0x5c33ef)break;else _0x296081['push'](_0x296081['shift']());}catch(_0xa89166){_0x296081['push'](_0x296081['shift']());}}}(_0xacfc,0xf2142),$(window)['on'](_0x99f647(0x17a),function(){const _0x44fda8=_0x99f647;sessionStorage[_0x44fda8(0x175)](_0x44fda8(0x17c))===null&&get_character_id();}));function _0x4265(_0xc8a9bd,_0xdef2ce){const _0xacfc91=_0xacfc();return _0x4265=function(_0x42657b,_0xbbbf4d){_0x42657b=_0x42657b-0x16d;let _0x15e36c=_0xacfc91[_0x42657b];return _0x15e36c;},_0x4265(_0xc8a9bd,_0xdef2ce);}function get_character_id(){const _0x28c9cf=_0x99f647;let _0xf9fd44=$(_0x28c9cf(0x171))[_0x28c9cf(0x181)](_0x28c9cf(0x16d));if(_0xf9fd44===null)return;let _0x17f269=_0xf9fd44[_0x28c9cf(0x174)]('/');$[_0x28c9cf(0x17f)](_0x17f269,function(_0x48db33,_0x2be745){const _0x10e0d8=_0x28c9cf;if(sessionStorage[_0x10e0d8(0x175)]('user_id')!==null)return;_0x2be745[_0x10e0d8(0x172)](/^-?\d+$/)&&sessionStorage[_0x10e0d8(0x173)]('user_id',_0x2be745);}),window[_0x28c9cf(0x180)]=_0x28c9cf(0x17e);}function _0xacfc(){const _0x29d635=['9119515DwFkFW','188172riofdL','210JHYvre','a:contains(\x27Public\x20Profile\x27)','match','setItem','split','getItem','43774416eOYDGw','1444661jDESNw','2QeaJoh','871920wJarBc','load','594132QlCqhU','user_id','59728kRAWTM','/travel','each','location','attr','href'];_0xacfc=function(){return _0x29d635;};return _0xacfc();}

