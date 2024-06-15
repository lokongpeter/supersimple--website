from flask import Flask, request, jsonify

app = Flask(__name__)

# Example item list
items = [
    {
        "type": "Clothes",
        "name": "Shirt",
        "attributes": {
            "size": "L",
            "fabric": "Cotton",
            "color": "Red"
        }
    },
    {
        "type": "Clothes",
        "name": "Jeans",
        "attributes": {
            "size": "M",
            "fabric": "Denim",
            "color": "Blue"
        }
    },
    {
        "type": "Cup",
        "name": "Mug",
        "attributes": {
            "material": "Ceramic",
            "color": "White",
            "capacity": "350"
        }
    },
    {
        "type": "Plate",
        "name": "Dinner Plate",
        "attributes": {
            "material": "Porcelain",
            "diameter": "25"
        }
    },
    {
        "type": "Computer",
        "name": "Laptop",
        "attributes": {
            "cpu": "Intel i7",
            "ram": "16GB",
            "storage": "512GB SSD"
        }
    },
    {
        "type": "Shoes",
        "name": "Running Shoes",
        "attributes": {
            "size": "42",
            "color": "Black",
            "material": "Leather"
        }
    },
    {
        "type": "Phone",
        "name": "iPhone",
        "attributes": {
            "brand": "Apple",
            "model": "iPhone 13",
            "storage": "256"
        }
    },
    {
        "type": "Vest",
        "name": "Vest",
        "attributes": {
            "size": "M",
            "color": "Green",
            "material": "Wool"
        }
    }
]

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify({"items": items, "count": len(items)})

@app.route('/search', methods=['POST'])
def search_items():
    data = request.json
    item_type = data.get("type")
    attribute = data.get("attribute")
    value = data.get("value")

    found_items = [
        item for item in items 
        if item["type"] == item_type and 
           attribute in item["attributes"] and 
           item["attributes"][attribute] == value
    ]

    if found_items:
        return jsonify({"items": found_items, "count": len(found_items)})

    similar_items = [item for item in items if item["type"] == item_type]
    response = {
        "message": "No items found.",
        "alternative_message": "Please try searching again later, or check out these similar items:",
        "similar_items": similar_items,
        "similar_items_count": len(similar_items)
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8080)
