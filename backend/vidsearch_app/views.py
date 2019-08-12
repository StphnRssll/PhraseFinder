from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# importing BS4 and requests for search result scraper
from bs4 import BeautifulSoup as bs
import requests
# from https://pypi.org/project/youtube-transcript-api/
from youtube_transcript_api import YouTubeTranscriptApi


# Helper function - gets video url and returns id
def getID(vid_url):
    vid_url = vid_url.replace('&t=1s', '')
    vid_id = vid_url.split("=")[1]
    return(vid_id)


# Takes query from video search box and returns [ID's,Titles] of top results
def vid_search(query_string):
    base = "https://www.youtube.com/results?search_query="
    #query_string = str(vid_query)#.replace(" ","+")
    r = requests.get(base+query_string)
    page = r.text
    soup=bs(page,'html.parser')
    vids = soup.findAll('a',attrs={'class':'yt-uix-tile-link'})
    top_vid_ids = []
    top_vid_titles = []
    vid_id = ""

    limit = 5
    for index, v in enumerate(vids):
        if("v=" in str(v)):
            vid_id = str(v['href'])
            vid_id = getID(vid_id)
            title = str(v['title'])
            top_vid_ids.append(vid_id)
            top_vid_titles.append(title)
            if index == limit:
                break
    return [top_vid_ids,top_vid_titles]


# Takes a video's id & a caption query -> returns found_lines
def search_transcript(vid_id, words):
    error_count = 0
    transcript = None
    try:
        transcript = YouTubeTranscriptApi.get_transcript(vid_id)
    except:
        return "NO_TRANSCRIPT"
        
    found_lines = []
    words = [word.upper() for word in words]
    for line in transcript: # vvv Bek Magic vvv
        line["start"] = int(line["start"]) # "start" is a string respresing the start time. this makes start an int.
        found_words = [] 
        found_words = list(filter(lambda word:line["text"].upper().find(word)!=-1,words)) # 
        if(found_words):
            found_lines.append({"found_words": found_words, "line": line}) # if the word is found in the line, catalogue the line
    
    return found_lines # found_lines contains an entry for every line a word is found on. 
    # "found_words" contains each cap_keyword found on the line and "line" is a json type thing i believe


def main(request): #old main
    key_words = request.GET.get("key_words")
    vid_url = request.GET.get("vid_url")
    vid_id = getID(vid_url)
    key_words = request.GET.get("key_words").split(" ")
    found_lines = search_transcript(vid_id, key_words)
    return render(request, 'results.html', context = {"found_lines": found_lines, "base_id": vid_id} ) 


def newMain(request):
    vid_query = str(request.GET.get("vid_query"))
    caption_query = str(request.GET.get("caption_query"))
    [top_vid_ids,top_vid_titles] = vid_search(vid_query)

    # Search for captions
    caption_query = request.GET.get("caption_query")
    key_words = caption_query.split(" ")
    NO_TRANSCRIPT_COUNT = 0
    top_vids = []
    
    for index, vid_id in enumerate(top_vid_ids):
        found_lines = search_transcript(vid_id,key_words)
        vid = {"vid_id": vid_id, "transcript": True, "title": top_vid_titles[index], "found_lines": found_lines}
        if found_lines == "NO_TRANSCRIPT":
            NO_TRANSCRIPT_COUNT = NO_TRANSCRIPT_COUNT + 1
            vid["transcript"] = False
        top_vids.append(vid)
            
    # query_string = vid_search(vid_query)
    return render(request, 'newResults.html', context = {"top_vid_ids": top_vids, "top_vid_titles": top_vid_titles, "found_lines": found_lines,"NO_TRANSCRIPT_COUNT": NO_TRANSCRIPT_COUNT})
