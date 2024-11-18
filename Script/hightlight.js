const chars = {
    "Chồng" : '<char class="deeppink">Chồng</char>',
    "Vợ" : '<char class="purple">Vợ</char>',
    "Bố" : '<char class="deeppink">Bố</char>',
    "Đ1" : '<char class="darkorange">Đ1</char>',
    "Đ2" : '<char class="red">Đ2</char>',
    "Mẹ" : '<char class="purple">Mẹ</char>',
    "Ông ngoại" : '<char class="peru">Ông ngoại</char>',
    "ĐC": '<char class="aqua">ĐC</char>',
    "Con": '<char class="darkblue">Con</char>',
    "Em": '<char class="darkpink">Em</char>',
    "Bà ngoại": '<char class="darkolivegreen">Bà ngoại</char>',
    


}

for(let char in chars){
    document.body.innerHTML = document.body.innerHTML.replaceAll(`$${char}`, chars[char]);
}