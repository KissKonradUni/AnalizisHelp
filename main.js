const resolution = 256;

document.querySelectorAll(".plot").forEach(plot => {
    let func_ = plot.getAttribute("func");
    
    var canvas = document.createElement("canvas");
    canvas.width = resolution;
    canvas.height = resolution;
    plot.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(resolution / 2, 0             );
    ctx.lineTo(resolution / 2, resolution    );
    ctx.moveTo(0             , resolution / 2);
    ctx.lineTo(resolution    , resolution / 2);
    ctx.stroke();

    let minx = parseFloat(plot.getAttribute("minx") ?? -Math.PI*2);
    let maxx = parseFloat(plot.getAttribute("maxx") ??  Math.PI*2);
    let miny = parseFloat(plot.getAttribute("miny") ?? -Math.PI*2);
    let maxy = parseFloat(plot.getAttribute("maxy") ??  Math.PI*2);

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText(maxx.toFixed(2), resolution - ctx.measureText(maxx.toFixed(2)).width - 4, resolution/2 - 4, 200);
    ctx.fillText(maxy.toFixed(2), resolution/2 + 4, 20, 200);

    let width = maxx - minx;
    let height = maxy - miny;

    let samples = parseInt(plot.getAttribute("samples") ?? 64);

    let skip = parseFloat(eval(plot.getAttribute("skip")));
    let skipOffset = parseFloat(eval(plot.getAttribute("skipOffset")) ?? 0);
    let delta = parseFloat(plot.getAttribute("delta") ?? 0.1);

    let y = 0.0;

    ctx.strokeStyle = "#f00";
    ctx.beginPath();
    ctx.lineWidth = 3.0;
    ctx.translate(resolution/2, resolution/2);
    for(let x = minx; x <= maxx; x += (width / samples)) {
        y = -1 * eval(func_);
        if (y == Infinity)
            y = maxy;
        if (y == -Infinity)
            y = miny;

        if (Math.abs(x) % skip > (skipOffset - delta) && Math.abs(x) % skip < (skipOffset + delta))
            ctx.moveTo(x * (resolution / width), y * (resolution / height));
        else
            ctx.lineTo(x * (resolution / width), y * (resolution / height));
    }
    ctx.stroke();
})

const html = document.querySelector("html");
document.getElementById("lightmode").addEventListener("click", () => {
    html.setAttribute("lightmode", !((html.getAttribute("lightmode") ?? false) === "true"));
});