import numpy as np
import cv2
import matplotlib.pyplot as plt
import pdb
from subprocess import call

class Car:
    coordinates = []
    derivativeSum = 0
    reckless = False

def analyzeGraph(carList):
    calculatedIdealPath = -19.6018571201 #eventually could have some way to do this dynamically, but for now this is just
                                         #a tested ideal path
    for car in carList:
        for i in range(len(car.coordinates) - 2):
            plt.scatter(car.coordinates[i][0], car.coordinates[i][1])
            car.derivativeSum += ((car.coordinates[i+1][1] - car.coordinates[i][1]) / (car.coordinates[i+1][0] - car.coordinates[i][0]))

        if abs(abs(car.derivativeSum) - abs(calculatedIdealPath)) > 100: #see if the car path differs from ideal path by more than 100
                                                                         #this should account for maybe one or two turns
            car.reckless = True

    for _car in carList:
        if _car.reckless:
            call('./executeCurl.sh')
            break

    plt.show()
    cv2.destroyAllWindows()

def drawOpticalFlow(videoName):
    cap = cv2.VideoCapture(videoName)

    feature_params = dict( maxCorners = 100,
                           qualityLevel = 0.6,
                           minDistance = 7,
                           blockSize = 7 )

    lk_params = dict( winSize  = (15,15),
                      maxLevel = 2,
                      criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

    color = np.random.randint(0,255,(100,3))

    ret, old_frame = cap.read()
    old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
    p0 = cv2.goodFeaturesToTrack(old_gray, mask = None, **feature_params)

    mask = np.zeros_like(old_frame)

    listOfCars = []

    #pdb.set_trace()
    for coordinate in p0:
        newCar = Car()
        newCar.coordinates = coordinate.tolist()
        listOfCars.append(newCar)

    while(1):
        ret,frame = cap.read()

        if frame is None:
            cv2.destroyAllWindows()
            break

        frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        p1, st, err = cv2.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None, **lk_params)

        if st is None:
            cv2.destroyAllWindows()
            break

        good_new = p1[st==1]
        good_old = p0[st==1]

        for i,(new,old) in enumerate(zip(good_new,good_old)):
            a,b = new.ravel()
            c,d = old.ravel()

            listOfCars[i].coordinates.append((a,b))

            #plt.plot((a,c), (b,d))
            mask = cv2.line(mask, (a,b), (c,d), color[i].tolist(), 2)
            frame = cv2.circle(frame, (a,b), 5, color[i].tolist(), -1)

        img = cv2.add(frame,mask)
        cv2.imshow('frame',img)

        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break

        old_gray = frame_gray.copy()
        p0 = good_new.reshape(-1,1,2)

    analyzeGraph(listOfCars)

drawOpticalFlow('./DrivingVideos/straightCrop.mp4')
#drawOpticalFlow('./DrivingVideos/swervingCrop.mp4')
