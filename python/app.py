from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")

@app.route("/")
def root():
    return render_template("template.liquid", lang="Python", engine="Flask")

@app.route("/search/<query>")
def search(query: str):
    return render_template("search.liquid", query=query)
