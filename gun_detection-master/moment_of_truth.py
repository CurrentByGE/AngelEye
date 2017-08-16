import numpy as np
import cv2
import http.client
from subprocess import call

#this is the cascade we just made. Call what you want
gun_cascade = cv2.CascadeClassifier('data/gun1/gun1_cascade.xml')
bond_gun_cascade1 = cv2.CascadeClassifier('data/bond_gun1/cascade.xml')
bond_gun_cascade2 = cv2.CascadeClassifier('data/bond_gun2/cascade.xml')
vid_cascade = cv2.CascadeClassifier('data/vid/cascade.xml')

gun_vid_only = 1

if(gun_vid_only):
    cap = cv2.VideoCapture('gun_vid.mp4')
else:
    cap = cv2.VideoCapture('other_vid.mp4')

detected = 0
once = 1

while 1:
    ret, vid = cap.read()
    # daniel craig bond
    # bond_img1 = cv2.imread('/Users/anirudh/Desktop/opencv_workspace/test_pics/Daniel-Craig-james-bond-gun.jpg')
    # gray_bond1 = cv2.cvtColor(bond_img1, cv2.COLOR_BGR2GRAY)
    gray = cv2.cvtColor(vid, cv2.COLOR_BGR2GRAY)

    # # pierce brosnan bond
    # bond_img2 = cv2.imread('/Users/anirudh/Desktop/opencv_workspace/test_pics/bond_gun2.jpg')
    # gray_bond2 = cv2.cvtColor(bond_img2, cv2.COLOR_BGR2GRAY)

    # # 
    
    # # add this
    # # image, reject levels level weights.
    # guns1 = bond_gun_cascade1.detectMultiScale(gray_bond1, 5, 10)
    # guns2 = bond_gun_cascade2.detectMultiScale(gray_bond2, 6, 8)
    if(gun_vid_only):
        guns = vid_cascade.detectMultiScale(gray, 5, 9)
    else:
        guns = vid_cascade.detectMultiScale(gray, 50, 50)
    
    # add this
    # for (x,y,w,h) in guns1:
    #     cv2.rectangle(bond_img1,(x,y),(x+w,y+h),(255,255,0),2)

    # for (x,y,w,h) in guns2:
    #     cv2.rectangle(bond_img2,(x,y),(x+w,y+h),(255,255,0),2)

    for (x,y,w,h) in guns:
        cv2.rectangle(vid, (x,y),(x+w,y+h), (255,255,0),2)
        detected = 1

    if(detected and once):
        print("sending post")
        once = 0
        call(['./send.sh'])


    # cv2.imshow('img1', bond_img1)
    # cv2.imshow('img2', bond_img2)
    cv2.imshow('vid', vid)



    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()

