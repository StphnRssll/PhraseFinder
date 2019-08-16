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

    limit = 15
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
    transcript = None
    found_lines = []
    try:
        transcript = YouTubeTranscriptApi.get_transcript(vid_id, languages=['en'])
    except:
        return ["NO_TRANSCRIPT",0]
    
    word_count = 0
    words = [word.upper() for word in words]
    
    for line in transcript:
        line["start"] = int(line["start"]) # "start" is a string respresing the start time. this makes start an int.
        found_words = [] 
        found_words = list(filter(lambda word:line["text"].upper().find(word)!=-1,words)) 
        if(found_words):
            found_lines.append({"found_words": found_words, "line": line}) # if the word is found in the line, catalogue the line
            word_count = word_count + 1
            print(word_count)
    
    return [found_lines, word_count] # found_lines contains an entry for every line a word is found on. 
    # "found_words" contains each cap_keyword found on the line and "line" is a json type thing i believe


def newMain(request):
    vid_query = str(request.GET.get("vid_query"))
    [top_vid_ids, top_vid_titles] = vid_search(vid_query)

    # Search for captions
    caption_query = request.GET.get("caption_query")
    key_words = caption_query.split(" ")
    NO_TRANSCRIPT_COUNT = 0
    top_vids = []

    for index, vid_id in enumerate(top_vid_ids):
        [found_lines, word_count] = search_transcript(vid_id, key_words)
        vid = {"vid_id": vid_id, "transcript": True, "title": top_vid_titles[index], "found_lines": found_lines,"word_count": word_count}
        if found_lines == "NO_TRANSCRIPT":
            NO_TRANSCRIPT_COUNT = NO_TRANSCRIPT_COUNT + 1
            vid["transcript"] = False
        top_vids.append(vid)
            
    # query_string = vid_search(vid_query)
    context = {"top_vids": top_vids, "top_vid_titles": top_vid_titles, "found_lines": found_lines,"NO_TRANSCRIPT_COUNT": NO_TRANSCRIPT_COUNT}
    return JsonResponse(context)
