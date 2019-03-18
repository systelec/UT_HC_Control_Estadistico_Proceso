#!/bin/bash
push=false

function apigithub()
{
	API_RESPONSE=$(curl -u "systelec:sysa5450" https://api.github.com/repos/systelec/UT_HC_Control_Estadistico_Proceso/branches/master)
	repo=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)")

		name=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['name']")
		sha=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['commit']['sha']")
		message=$( echo $API_RESPONSE | python -c "import sys, json; print json.load(sys.stdin)['commit']['commit']['message']")
		
		type_commit="${message%:*}"
		length_type_commit=${#type_commit}

		if [ $push = false ]; then 
			sha_old=$sha			
		fi

		if [ $sha != $sha_old ] && [ $length_type_commit -lt 7 ]; then

			if [ $type_commit = "BUILD" ]; then 
				command git pull
				command bash ./api/restart.sh
				command bash ./client/restart.sh
				command bash ./data/restart.sh
			fi
			sha_old=$sha
		fi

	push=true
	sleep 10
	apigithub
}

apigithub