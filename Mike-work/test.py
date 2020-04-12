# import necessary libraries
from flask import Flask, render_template
# create instance of Flask app
app = Flask(__name__)
# create route that renders index.html template
@app.route("/")
def index():
    movie_list = ["Mighty Ducks", "Space Jam", "Clerks", "Batman", "Avengers"]
    return ("index.html")
if __name__ == "__main__":
    app.run(debug=True)