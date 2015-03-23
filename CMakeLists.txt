# CMake Basics
cmake_minimum_required (VERSION 2.8.11)
project (addon)

# Preprocessor Metadata
set(ADDON_ID "aviary-addons-manager@addons.palemoon.org")
set(ADDON_VERSION "1.0.0")
set(ADDON_NAME "Aviary Add-ons Manager")
set(ADDON_XPI_NAME "aviary-addons-manager")
set(ADDON_SHORT_DESC "Aviary Toolkit style Add-ons Manager")
set(ADDON_LONG_DESC "Aviary Toolkit style Add-ons Manager")
set(ADDON_AUTHOR "Pale Moon Add-ons team")
set(ADDON_TARGET_APP_NAME "Pale Moon")
set(ADDON_TARGET_APP_ID "{8de7fcbb-c55c-4fbe-bfc5-fc555c87dbc4}")
set(ADDON_TARGET_APP_MINVER "25.0")
set(ADDON_TARGET_APP_MAXVER "25.*")
set(ADDON_APMO_ID "pm-null")
set(ADDON_APMO_TYPE "extension")

# Process Pale Moon Add-ons Site manifest.ini
configure_file(
	${CMAKE_SOURCE_DIR}/manifest.ini.in 
	${CMAKE_BINARY_DIR}/dist/package/manifest.ini 
	@only
)

# Process Pale Moon Add-ons Site update.xml
configure_file(
	${CMAKE_SOURCE_DIR}/update.xml.in 
	${CMAKE_BINARY_DIR}/dist/package/update.xml 
	@only
)

# Copy Add-on files to dist/bin
file(
	COPY "${CMAKE_SOURCE_DIR}/src/"
	DESTINATION "${CMAKE_BINARY_DIR}/dist/bin/"
)

# Process Add-on chrome.manifest file
configure_file(
	${CMAKE_SOURCE_DIR}/chrome.manifest.in 
	${CMAKE_BINARY_DIR}/dist/bin/chrome.manifest 
	@only
)

# Process Add-on install.rdf file
configure_file(
	${CMAKE_SOURCE_DIR}/install.rdf.in 
	${CMAKE_BINARY_DIR}/dist/bin/install.rdf 
	@only
)

# Zip up the dist/bin contents into an XPI file and hash it to the console
add_custom_command (
	WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/dist/bin/
	OUTPUT ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
	COMMAND zip -r ../package/${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi ./
	# This is winhasher's command line hashing tool. Put it in the msys bin dir as whash.exe
	COMMAND whash -sha256 ${CMAKE_BINARY_DIR}"/dist/package/"${ADDON_XPI_NAME}"-"${ADDON_VERSION}".xpi"
	DEPENDS package-xpi
)

add_custom_target(
	package-xpi
	ALL
	DEPENDS ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
)