// Command unzip handles an uploaded zip and reads its manifest. It is the
// affected snippet from the talk, run by govulncheck on go1.25.5: no
// net/http, so the scan reports this one vulnerability and nothing else.
package main

import (
	"archive/zip"
	"io"
	"os"
)

func handleUpload(upload io.ReaderAt, size int64) error {
	zr, err := zip.NewReader(upload, size)
	if err != nil {
		return err
	}
	f, err := zr.Open("manifest.json")
	if err != nil {
		return err
	}
	defer f.Close()
	_, err = io.Copy(os.Stdout, f)
	return err
}

func main() {
	upload, err := os.Open(os.Args[1])
	if err != nil {
		panic(err)
	}
	defer upload.Close()
	info, err := upload.Stat()
	if err != nil {
		panic(err)
	}
	if err := handleUpload(upload, info.Size()); err != nil {
		panic(err)
	}
}
