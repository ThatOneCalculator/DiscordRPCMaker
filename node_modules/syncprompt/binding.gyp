{
    "targets": [
        {
            "target_name": "sync_prompt",
            "sources": [
                "src/sync_prompt.cc"
            ],
            "include_dirs" : [
                "<!(node -e \"require('nan')\")"
            ]

        }
    ]
}
