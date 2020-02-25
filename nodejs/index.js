var request = require('request');
const rsa = require('./rsa')

var endpoint = 'https://sandbox-partner.vietmoney.vn/collections/v1'

var options = {
  'method': 'GET',
  'url': `${endpoint}/contracts`,
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYSEpndTUwMHdSVzNiVFMtM3VTdjhGZnBmMVlxM05JUnY3TzM3bmpQaERJIn0.eyJqdGkiOiIxYjRjNDdiOS1jY2VjLTQxN2EtYTA5Zi0wY2MwZmMxNmMzYzUiLCJleHAiOjE1ODUwNDczMzgsIm5iZiI6MCwiaWF0IjoxNTgyNDU1MzM4LCJpc3MiOiJodHRwczovL2lkLWRldi52aWV0bW9uZXkudm4vYXV0aC9yZWFsbXMvdmlldG1vbmV5d29yayIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0YTFmN2I4YS0xYTJmLTRjZmUtYmZiZS0xMTY0NDBmOTY4OTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYW1wbGUiLCJhdXRoX3RpbWUiOjE1ODI0NTUzMzgsInNlc3Npb25fc3RhdGUiOiIzNmQzZjJlOC0yMWMyLTQ1NzItODVlZS1mYzM1MWY1NDFlNDEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIHZpZXRtb25leXdvcmstc2NvcGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJuYW1lIjoiVGhhaSBMZSIsInByZWZlcnJlZF91c2VybmFtZSI6InRoYWlsaCIsImdpdmVuX25hbWUiOiJUaGFpIiwibG9jYWxlIjoiZW4iLCJmYW1pbHlfbmFtZSI6IkxlIiwidGlja2V0X3VpZCI6IjEiLCJlbWFpbCI6Imhvbmd0aGFpMDEwMUBnbWFpbC5jb20iLCJncm91cCI6WyIvU291dGhfUmVnaW9uL0hvX0NoaV9NaW5oX0NpdHkvQ004IiwiL0hlYWRfT2ZmaWNlL0lUIl19.LxrEKk7K5GW0sF7xwqbSZkdBu0dpPineGQ02KuyF5gGsGjykWqzl9kay4LM-lJffNhbStpe-8isXonQK5yOrGcsFMOdaTK5YAxsTYsDPZvWhhE1Kv-cRnpCi8c-WYPWA7vPBjIMjLI5cUZt36LkChRJd5pkI8F0ngu20XnTfTdBWbkm3gIzCC6wnlSMuVG-cJ8da6nP8lYUez-NnLMJfAfOL6eE1IjT6x0SFUQoGBE3u8pkjyEYt0sP4KzPZIMJlEztQlUfBmzlR3BUJ3FVVHxmp0o94xVqldOlWLei-1hV0I0DOPXT6rcXONR1RCNsT263N8kdXXCqfpzMdwTkBow'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
