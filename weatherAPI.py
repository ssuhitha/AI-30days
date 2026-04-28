import requests

API_KEY = "4b1d8bfc919e610edfb60a4a7a91d8f4"
city="Vijayawada"
url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

response = requests.get(url)
data = response.json()

print(f"City : {data['name']}")

print(f"Temperature: {data['main']['temp']}°C")

print(f"Weather: {data['weather'][0]['description']}")

print(f"Humidity: {data['main']['humidity']}%")

